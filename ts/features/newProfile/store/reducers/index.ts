import * as pot from "@pagopa/ts-commons/lib/pot";
import { getType } from "typesafe-actions";
import { Action } from "../../../../store/actions/types";
import { NetworkError } from "../../../../utils/errors";
import NewProfile from "../../types";
import { newProfileActions } from "../actions";

export type NewProfileState = pot.Pot<NewProfile, NetworkError>;

export const initialState: NewProfileState = pot.none;

const reducer = (
  state: NewProfileState = initialState,
  action: Action
): NewProfileState => {
  switch (action.type) {
    case getType(newProfileActions.request):
      return pot.toLoading(state);
    case getType(newProfileActions.success):
      return pot.some(action.payload);
    case getType(newProfileActions.failure):
      return pot.toError(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
