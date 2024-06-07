import { makeVar } from "@apollo/client/index.js";

export const reportFormState = makeVar<{
    reportingItemId: null | string;
}>({
    reportingItemId: null,
});