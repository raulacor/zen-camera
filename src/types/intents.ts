export type Intent = ChatIntent | SummaryIntent | FlashcardsIntent | ImgGenIntent | MindmapIntent 

export type ChatIntent = {
  intent_name: "chat"
  title: string
  message: string
}

export type SummaryIntent= {
    intent_name: "summary",
    title: string,
    summary: string
    key_points: string[]
}

export type FlashcardsIntent = {
    intent_name: "flashcards",
    title: string,
    cards: {question: string, answer: string}[]
}

export type ImgGenIntent = {
    intent_name: "image_gen",
    title: string,
    image_src: "base64",
    prompt: string
} 

type MindmapNode = {
    name: string,
    children?: MindmapNode[]
}
export type MindmapIntent = {
    intent_name: "mindmap",
    name: string,
    children?: MindmapNode[]
}

export type IntentEnvelope = {
  intents: Intent[]
}

export type ChatResponse = {
  reply: IntentEnvelope
}