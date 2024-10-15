import { SagaIterator } from "redux-saga";
import { takeLatest } from "typed-redux-saga/macro";
import { BackendClient } from "../../../../api/backend";
import { newProfileActions } from "../actions";
import { handleNewProfileData } from "./handleNewProfileData";

/**
 * Watches the profile data request
 * @param getProfile the function to call the backend
 * @returns the saga iterator
 * Note: we are using takeLatest to handle only the latest request and ignore the previous ones
 */
export function* watchNewProfileSaga(
  getProfile: ReturnType<typeof BackendClient>["getProfile"]
): SagaIterator {
  // watch for the profile data request
  yield* takeLatest(
    newProfileActions.request,
    handleNewProfileData,
    getProfile
  );
}
