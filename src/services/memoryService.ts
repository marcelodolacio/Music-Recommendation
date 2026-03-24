import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import { PostgresStore } from "@langchain/langgraph-checkpoint-postgres/store";
import { config } from "../config.ts";

export type MemoryService = {
    checkPoint: PostgresSaver
    store: PostgresStore
}

export async function createMemoryService(): Promise<MemoryService> {
    const dbUri = config.memory.dbUri
    const store = PostgresStore.fromConnString(dbUri)
    const checkPoint = PostgresSaver.fromConnString(dbUri)

    await store.setup()
    await checkPoint.setup()

    return { checkPoint, store }
}