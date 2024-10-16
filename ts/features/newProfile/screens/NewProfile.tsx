import {
  ContentWrapper,
  Divider,
  ListItemSwitch,
  VSpacer
} from "@pagopa/io-app-design-system";
import * as pot from "@pagopa/ts-commons/lib/pot";
import React, { useCallback, useEffect, useState } from "react";
import { UserDataProcessingChoiceEnum } from "../../../../definitions/backend/UserDataProcessingChoice";
import { IOScrollViewWithLargeHeader } from "../../../components/ui/IOScrollViewWithLargeHeader";
import I18n from "../../../i18n";
import { useIONavigation } from "../../../navigation/params/AppParamsList";
import ROUTES from "../../../navigation/routes";
import {
  loadUserDataProcessing,
  resetUserDataProcessingRequest
} from "../../../store/actions/userDataProcessing";
import { useIODispatch, useIOSelector } from "../../../store/hooks";
import { userDataProcessingSelector } from "../../../store/reducers/userDataProcessing";
import NewProfileContent from "../components/NewProfileContent";
import NewProfileError from "../components/NewProfileError";
import NewProfileLoading from "../components/NewProfileLoading";
import { newProfileActions } from "../store/actions";
import { selectNewProfile } from "../store/selectors";

const NewProfileScreen = () => {
  const dispatch = useIODispatch();
  const newProfileSelector = useIOSelector(selectNewProfile);
  const { DELETE } = useIOSelector(userDataProcessingSelector);
  const navigation = useIONavigation();
  const [isDeletionRequested, setIsDeletionRequested] = useState(
    pot.isSome(DELETE)
  );

  const loadProfile = useCallback(
    () => dispatch(newProfileActions.request()),
    [dispatch]
  );

  const checkUserDataProcessing = useCallback(
    () =>
      dispatch(
        loadUserDataProcessing.request(UserDataProcessingChoiceEnum.DELETE)
      ),
    [dispatch]
  );

  useEffect(() => {
    loadProfile();
    checkUserDataProcessing();
  }, [checkUserDataProcessing, loadProfile]);

  useEffect(() => {
    setIsDeletionRequested(pot.isSome(DELETE));
  }, [DELETE]);

  const NewProfileContentMapped = useCallback(
    () =>
      pot.fold(
        newProfileSelector,
        () => <NewProfileLoading />,
        () => <NewProfileLoading />,
        () => <NewProfileLoading />,
        () => <NewProfileError onPress={loadProfile} />,
        value => <NewProfileContent {...value} />,
        () => <NewProfileLoading />,
        () => <NewProfileLoading />,
        () => <NewProfileError onPress={loadProfile} />
      ),
    [loadProfile, newProfileSelector]
  );

  const handleSwitchValueChange = useCallback(
    (value: boolean) =>
      value
        ? navigation.navigate(ROUTES.NEW_PROFILE_STACK_NAVIGATOR, {
            screen: ROUTES.NEW_PROFILE_DELETE_SCREEN
          })
        : dispatch(
            resetUserDataProcessingRequest(UserDataProcessingChoiceEnum.DELETE)
          ),
    [dispatch, navigation]
  );

  return (
    <IOScrollViewWithLargeHeader
      title={{
        label: I18n.t("newProfile.title")
      }}
      description={I18n.t("newProfile.subtitle")}
      headerActionsProp={{ showHelp: true }}
    >
      <ContentWrapper>
        <NewProfileContentMapped />
        <Divider />
        <ListItemSwitch
          icon="info"
          label="Stato cancellazione utenza"
          value={isDeletionRequested}
          description="Se attivato, la tua utenza sarà cancellata"
          onSwitchValueChange={handleSwitchValueChange}
          isLoading={pot.isLoading(DELETE)}
        />
        <VSpacer size={48} />
      </ContentWrapper>
    </IOScrollViewWithLargeHeader>
  );
};
export default NewProfileScreen;
