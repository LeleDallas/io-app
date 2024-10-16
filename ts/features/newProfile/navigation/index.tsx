import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import ROUTES from "../../../navigation/routes";
import NewProfileDelete from "../screens/NewProfileDelete";
import NewProfileDeleteSuccess from "../screens/NewProfileDeleteSuccess";
import NewProfileDeleteConfirmation from "../screens/NewProfileDeleteConfirmation";

export type NewProfileNavigatorParamList = {
  [ROUTES.NEW_PROFILE_DELETE_SCREEN]: undefined;
  [ROUTES.NEW_PROFILE_DELETE_CONFIRMATION]: undefined;
  [ROUTES.NEW_PROFILE_DELETE_SUCCESS]: undefined;
};

const Stack = createStackNavigator<NewProfileNavigatorParamList>();

const NewProfileStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ROUTES.NEW_PROFILE_DELETE_SCREEN}
      component={NewProfileDelete}
    />
    <Stack.Screen
      name={ROUTES.NEW_PROFILE_DELETE_CONFIRMATION}
      component={NewProfileDeleteConfirmation}
    />
    <Stack.Screen
      name={ROUTES.NEW_PROFILE_DELETE_SUCCESS}
      component={NewProfileDeleteSuccess}
      {...{ options: { headerShown: false } }}
    />
  </Stack.Navigator>
);
export default NewProfileStackNavigator;
