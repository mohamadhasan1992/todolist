
export enum Priority {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2
}

export enum AuthActionsEnum{
    Signup,
    Login
}


export enum InventoryActionEnum{
    CreateProduct,
    UpdateProduct,
    DeleteProduct
}


export enum KafkaTopics{
    KafkaAuthenticationRequestTopic = "auth.request",   
    KafkaAuthenticationResponseTopic = "auth.response",   
    KafkaInventoryRequestTopic = "inventory.request",   
    KafkaInventoryResponseTopic = "inventory.response",   
}

