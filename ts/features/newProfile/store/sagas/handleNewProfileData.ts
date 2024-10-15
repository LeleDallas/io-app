import { readableReport } from "@pagopa/ts-commons/lib/reporters";
import * as E from "fp-ts/Either";
import { call, put } from "typed-redux-saga/macro";
import { ActionType } from "typesafe-actions";
import { BackendClient } from "../../../../api/backend";
import { SagaCallReturnType } from "../../../../types/utils";
import { getNetworkError } from "../../../../utils/errors";
import { withRefreshApiCall } from "../../../fastLogin/saga/utils";
import { newProfileActions } from "../actions";

/**
 * Handles the profile data request
 * @param getProfile the function to call the backend
 * @param action the action to handle
 */
export function* handleNewProfileData(
  getProfile: ReturnType<typeof BackendClient>["getProfile"],
  action: ActionType<typeof newProfileActions.request>
) {
  try {
    // call the backend to get the profile data
    const getProfileRequest = getProfile({});
    const response = (yield* call(
      withRefreshApiCall,
      getProfileRequest,
      action
    )) as unknown as SagaCallReturnType<typeof getProfile>;

    if (E.isRight(response)) {
      // if the response is right and the status is 200, we update the state with the response value
      if (response.right.status === 200) {
        const {
          name,
          fiscal_code,
          email = "Email not found"
        } = response.right.value;

        yield* put(
          newProfileActions.success({
            name,
            fiscalCode: fiscal_code,
            email
          })
        );
      }
      // if the response is right and the status is not 200 or 401, we throw an error
      else {
        throw new Error(`Unexpected status code: ${response.right.status}`);
      }
    } else {
      // if the response is not right, we throw an error with the readable report
      throw new Error(readableReport(response.left));
    }
  } catch (e) {
    // if an error occurs, we update the state with the error
    yield* put(newProfileActions.failure(getNetworkError(e)));
  }
}
