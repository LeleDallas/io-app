import {
  GradientScrollView,
  IOStyles,
  IOToast
} from "@pagopa/io-app-design-system";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import I18n from "../../../i18n";
import {
  IOStackNavigationRouteProps,
  useIONavigation
} from "../../../navigation/params/AppParamsList";
import { MainTabParamsList } from "../../../navigation/params/MainTabParamsList";
import { useIODispatch, useIOSelector, useIOStore } from "../../../store/hooks";
import { useOnFirstRender } from "../../../utils/hooks/useOnFirstRender";
import { cgnDetails } from "../../bonus/cgn/store/actions/details";
import { idPayWalletGet } from "../../idpay/wallet/store/actions";
import {
  trackAllCredentialProfileProperties,
  trackOpenWalletScreen,
  trackWalletAdd
} from "../../itwallet/analytics";
import { ITW_ROUTES } from "../../itwallet/navigation/routes";
import { getPaymentsWalletUserMethods } from "../../payments/wallet/store/actions";
import { WalletCardsContainer } from "../components/WalletCardsContainer";
import { WalletCategoryFilterTabs } from "../components/WalletCategoryFilterTabs";
import { WalletPaymentsRedirectBanner } from "../components/WalletPaymentsRedirectBanner";
import { walletToggleLoadingState } from "../store/actions/placeholders";
import { selectWalletCards } from "../store/selectors";
import ROUTES from "../../../navigation/routes";
import { newProfileEnabled } from "../../../config";

type Props = IOStackNavigationRouteProps<MainTabParamsList, "WALLET_HOME">;

const WalletHomeScreen = ({ route }: Props) => {
  const store = useIOStore();
  useFocusEffect(() => {
    trackOpenWalletScreen();
    void trackAllCredentialProfileProperties(store.getState());
  });

  const dispatch = useIODispatch();
  const isNewElementAdded = React.useRef(route.params?.newMethodAdded || false);

  useFocusEffect(
    React.useCallback(() => {
      trackOpenWalletScreen();
    }, [])
  );

  useOnFirstRender(() => {
    fetchWalletSectionData();
  });

  const fetchWalletSectionData = () => {
    dispatch(walletToggleLoadingState(true));
    dispatch(getPaymentsWalletUserMethods.request());
    dispatch(idPayWalletGet.request());
    dispatch(cgnDetails.request());
  };

  // Handles the "New element added" toast display once the user returns to this screen
  useFocusEffect(
    React.useCallback(() => {
      if (isNewElementAdded.current) {
        IOToast.success(I18n.t("features.wallet.home.toast.newMethod"));
        // eslint-disable-next-line functional/immutable-data
        isNewElementAdded.current = false;
      }
    }, [isNewElementAdded])
  );

  return (
    <WalletScrollView>
      <WalletCategoryFilterTabs />
      <WalletPaymentsRedirectBanner />
      <WalletCardsContainer />
    </WalletScrollView>
  );
};

const WalletScrollView = ({ children }: React.PropsWithChildren<any>) => {
  const navigation = useIONavigation();
  const cards = useIOSelector(selectWalletCards);

  const handleAddToWalletButtonPress = () => {
    trackWalletAdd();
    navigation.navigate(ITW_ROUTES.MAIN, {
      screen: ITW_ROUTES.ONBOARDING
    });
  };

  const handleDeleteProfileButtonPress = () => {
    navigation.navigate(ROUTES.NEW_PROFILE_STACK_NAVIGATOR, {
      screen: ROUTES.NEW_PROFILE_DELETE_SCREEN
    });
  };

  if (cards.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={[
          IOStyles.flex,
          IOStyles.horizontalContentPadding
        ]}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <GradientScrollView
      primaryActionProps={{
        testID: "walletAddCardButtonTestID",
        label: I18n.t("features.wallet.home.cta"),
        accessibilityLabel: I18n.t("features.wallet.home.cta"),
        icon: "addSmall",
        iconPosition: "end",
        onPress: handleAddToWalletButtonPress
      }}
      secondaryActionProps={
        newProfileEnabled
          ? {
              testID: "walletDeleteProfileButtonTestID",
              label: I18n.t("newProfile.deleteFlow.title"),
              accessibilityLabel: I18n.t("newProfile.deleteFlow.title"),
              icon: "trashcan",
              iconPosition: "end",
              onPress: handleDeleteProfileButtonPress
            }
          : undefined
      }
      excludeSafeAreaMargins={true}
    >
      {children}
    </GradientScrollView>
  );
};

export { WalletHomeScreen };
