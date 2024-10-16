import { PersistPartial } from "redux-persist";
import { VersionInfoState } from "../../common/versionInfo/store/reducers/versionInfo";

import { BonusState } from "../../features/bonus/common/store/reducers";
import { PersistedFeaturesState } from "../../features/common/store/reducers";
import { PersistedLollipopState } from "../../features/lollipop/store";
import { NewProfileState } from "../../features/newProfile/store/reducers";
import { PersistedNotificationsState } from "../../features/pushNotifications/store/reducers";
import { TrialSystemState } from "../../features/trialSystem/store/reducers";
import { AppState } from "./appState";
import { AssistanceToolsState } from "./assistanceTools";
import { PersistedAuthenticationState } from "./authentication";
import { BackendStatusState } from "./backendStatus";
import { BackoffErrorState } from "./backoffError";
import { CieState } from "./cie";
import { ContentState } from "./content";
import { CrossSessionsState } from "./crossSessions";
import { PersistedDebugState } from "./debug";
import { EmailValidationState } from "./emailValidation";
import { PersistedEntitiesState } from "./entities";
import { PersistedIdentificationState } from "./identification";
import { InstallationState } from "./installation";
import { NavigationState } from "./navigation";
import { OnboardingState } from "./onboarding";
import { PaymentsState } from "./payments";
import { PersistedPreferencesState } from "./persistedPreferences";
import { PreferencesState } from "./preferences";
import { ProfileState } from "./profile";
import { SearchState } from "./search";
import { StartupState } from "./startup";
import { UserDataProcessingState } from "./userDataProcessing";
import { WalletState } from "./wallet";

export type GlobalState = Readonly<{
  appState: AppState;
  navigation: NavigationState;
  authentication: PersistedAuthenticationState;
  backendStatus: BackendStatusState;
  versionInfo: VersionInfoState;
  entities: PersistedEntitiesState;
  backoffError: BackoffErrorState;
  notifications: PersistedNotificationsState;
  onboarding: OnboardingState;
  profile: ProfileState;
  userDataProcessing: UserDataProcessingState;
  wallet: WalletState;
  preferences: PreferencesState;
  persistedPreferences: PersistedPreferencesState;
  content: ContentState;
  identification: PersistedIdentificationState;
  installation: InstallationState;
  debug: PersistedDebugState;
  search: SearchState;
  payments: PaymentsState;
  emailValidation: EmailValidationState;
  cie: CieState;
  bonus: BonusState;
  features: PersistedFeaturesState;
  crossSessions: CrossSessionsState;
  assistanceTools: AssistanceToolsState;
  startup: StartupState;
  lollipop: PersistedLollipopState;
  trialSystem: TrialSystemState;
  newProfile: NewProfileState;
}>;

export type PersistedGlobalState = GlobalState & PersistPartial;
