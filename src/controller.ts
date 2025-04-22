import type {UserSettingsType, UserType} from "~/scripts/shared/types/user";
import {ApiAliases, RequestMethod} from "~/scripts/shared/types";
import type {ConfigType} from "~/scripts/shared/types/common";
import {FeatureType} from "~/scripts/shared/types/common";
import type {CurrentPopupType} from "~/scripts/shared/types/communication";
import type {
    ConversationType,
    CreateConversationResponse, FileTypesResponse,
    SendMessageStreamResponse,
    ShortConversationType, UploadFileResponse
} from "~/scripts/shared/types/conversations";
import type {SendMessageBody} from "~/scripts/shared/types/private";
import {generateUUID} from "~/scripts/features/utils";
import type {CreatePaymentType, PaymentProvider} from "~/scripts/shared/types/payment";


export class ApiController {
    private domain = 'https://neovision.radolyn.com/api'

    constructor() {

    }

    async request(url: string, method: RequestMethod = RequestMethod.GET, data = {}, streaming: boolean = false) {
        const $user = useUserController();

        // console.warn('WAIT FOR BEING READY');
        await $user.whenReady();
        // console.warn('READY');

        try {
            const token = $user.getToken();

            let opts = {
                method: method,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                responseType: streaming ? 'stream' : 'json'
            }

            if (method === RequestMethod.POST) {
                opts.body = data
            }

            return await $fetch(`${this.domain}/${url}`, opts);
        } catch (e) {
            console.warn('[ApiController] request failed', e);
            return null
        }
    }

    /**
     *
     * @param messageText text of message
     * @param request_uuid uuid of question message
     * @param response_uuid uuid of expected answer message
     * @param addFiles whether add 'files' field to the body or not
     *
     * @private
     *
     * @returns request body for streaming send-message type of request
     */
    private sendMessageBody(
        response_uuid: string,
        request_uuid: string | undefined = undefined,
        messageText: string | undefined = undefined,
        addFiles: boolean = false
    ): SendMessageBody {
        let files = {};

        let uuid = generateUUID();
        let attachedFile = useEnv().attachedFile.value;
        if (addFiles && attachedFile) {
            files[uuid] = useEnv().attachedFileHash.value;
            useEnv().clearFile();
        }

        return {
            message: messageText,
            model: useSettings().getLlm()?.name,
            search_enabled: useSettings().isToolEnabled(FeatureType.search),
            request_message_id: request_uuid,
            response_message_id: response_uuid,
            files: files
        }

    }


    // ====== GET REQUESTS ======
    async getMe(): Promise<UserType> {
        return this.request(ApiAliases.me);
    }

    async getSettings(): Promise<UserSettingsType> {
        return this.request(ApiAliases.meSettings);
    }

    async getConfig(): Promise<ConfigType> {
        return this.request(ApiAliases.config);
    }

    async getConversations(offset: number = 0, count: number = 20): Promise<ShortConversationType[]> {
        return this.request(ApiAliases.conversations + `?offset=${offset}&limit=${count}`);
    }

    /**
     * Get allowed extensions of files, which can be attached to the request
     */
    async getFileTypes(): Promise<FileTypesResponse> {
        return this.request(ApiAliases.fileTypes);
    }

    /**
     * @param file_id
     * @param accessHash
     *
     * @returns The contents of the file, if present and access is allowed
     */
    async getFile(file_id: number, accessHash: string): Promise<string> {
        return this.request(ApiAliases.file + '/' + `${file_id}_${accessHash}`);
    }

    /**
     * @param conversation_id id of the conversation
     * @returns brief information about the conversation
     */
    async getConversationMetadata(conversation_id): Promise<ShortConversationType> {
        return this.request(ApiAliases.conversations + `?conversation_id=${conversation_id}`);
    }

    /**
     * @param conversation_id id of the conversion
     * @returns metadata about conversation and its messages and groups (???)
     */
    async getConversation(conversation_id: number): Promise<ConversationType> {
        return this.request(ApiAliases.conversation + '/' + conversation_id);
    }

    /**
     * @returns Current popup object if it must be shown for a user and null otherwise
     */
    async getCurrentPopup(): CurrentPopupType | null {
        return this.request(ApiAliases.popup);
    }

    // ====== POST REQUESTS ======

    /**
     * Create an empty conversation
     * @returns id of the new conversation
     */
    async createConversation(): CreateConversationResponse {
        return this.request(ApiAliases.conversation, RequestMethod.POST);
    }

    /**
     * Send message in a conversation
     *
     * @param conversation_id id of current conversation
     * @param messageText content of new message
     * @param request_uuid uuid of question message
     * @param response_uuid uuid of expected answer message
     * @returns response promise, response and request messages local UUIDs
     */
    async sendMessage(
        conversation_id: string,
        messageText: string,
        request_uuid: string,
        response_uuid: string
    ): SendMessageStreamResponse {
        return await this.request(
            ApiAliases.conversation + '/' + conversation_id,
            RequestMethod.POST,
            this.sendMessageBody(response_uuid, request_uuid, messageText, true),
            true)
    }

    /**
     * @param conversation_id
     * @param message_id
     * @param newText new text of a message
     * @param response_id uuid of response message
     */
    async editMessage(conversation_id: string, message_id: number, newText: string, response_id) {
        return this.request(ApiAliases.conversation + '/' + conversation_id + '/' + message_id + '/' + ApiAliases.edit, RequestMethod.POST, {
            response_message_id: response_id,
            text: newText
        }, true)
    }

    /**
     * Mark as viewed to not show already viewed popup next time
     *
     * @param id id of popup which visible for user currently
     */
    async viewCurrentPopup(id: number): void {
        return this.request(ApiAliases.viewPopup, RequestMethod.POST, {
            id: id
        });
    }


    /**
     * Saving base settings
     *
     * @param language language of an interface
     * @param responseStyle current response style
     *
     * Other settings, like current model or enabled tools are fetched from the last request to LLM
     * (other settings are memorized from the previous requests)
     */
    async saveSettings(language: string, responseStyle: number | null): void {
        return this.request(ApiAliases.meSettings, RequestMethod.POST, {
            language: language,
            response_style_id: responseStyle
        });
    }

    /**
     * Reroll last message of a conversation - send request with the same prompt to the LLM one more time
     *
     * @param conversation_id id of conversation
     * @param response_uuid uuid of expected answer message
     *
     * p.s. after rerolling message is not rewrote, it is recreated, that`s why response_uuid must be presented
     */
    async rerollMessage(conversation_id: string, response_uuid: string): SendMessageStreamResponse {
        return this.request(
            `${ApiAliases.conversation}/${conversation_id}/${ApiAliases.reroll}`,
            RequestMethod.POST,
            this.sendMessageBody(response_uuid),
            true
        )
    }

    /**
     * @param subscription_id id of the tier
     * @param provider method of payment (e.x. bank card)
     *
     * @returns url for pay money for subscription
     */
    async createPayment(subscription_id: number, provider: PaymentProvider): Promise<CreatePaymentType> {
        return this.request(ApiAliases.payment, RequestMethod.POST, {
            subscription_id: subscription_id,
            provider: provider
        });
    }

    /**
     * Interrupts generation of response
     * @param conversation_id
     */
    async stopGeneration(conversation_id: string) {
        return this.request(
            ApiAliases.conversation + '/' + conversation_id + '/' + ApiAliases.stop,
            RequestMethod.POST
        );
    }

    /**
     * Uploads file to the server in order to send it then
     * @param file object of a file
     */
    async uploadFile(file: File): Promise<UploadFileResponse> {
        const formData = new FormData();
        formData.append('file', file);

        return this.request(ApiAliases.uploadFile, RequestMethod.POST, formData);
    }
}