import { Command } from "@oclif/core";

export const handleGenericError = (e: any, context: Command) => {
    if (e.reason && e.value)
        context.error(`${e.reason}: ${e.value}`)
    else {
        context.error(e)
    }
}
