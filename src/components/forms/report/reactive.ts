import { makeVar } from "@apollo/client";

export const reportFormState = makeVar<{
    reportingItemId: null | string;
}>({
    reportingItemId: null,
});