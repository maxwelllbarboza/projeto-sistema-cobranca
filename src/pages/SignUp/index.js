import { LeftSidebar, RightSidebar, Screen } from "../../components/Containers";
import { BottomProgress, SideProgress } from "../../components/Progress";
import { SignUpProvider } from "../../contexts/SignUpContext";
import Etapas from "./etapas";
import "./styles.css";

const SignUp = () => {
  return (
    <SignUpProvider>
      <Screen>
        <LeftSidebar>
          <SideProgress />
        </LeftSidebar>

        <RightSidebar>
          <Etapas />
          <BottomProgress />
        </RightSidebar>
      </Screen>
    </SignUpProvider>
  );
};

export default SignUp;
