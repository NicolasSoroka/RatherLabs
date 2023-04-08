import Web3 from "web3";
import abi from "../utils/abi";
import styles from "../styles/MainPage.module.css";
import { Home } from "@/components";
import { LoginContainer } from "@/containers";
import { useGlobalContext } from "@/context/context";

const MainPage = () => {

  const { networkId, account } = useGlobalContext();

  return (
      <div className={styles.container}>
        <LoginContainer/>
        {account !== null && networkId === 5 && <Home />}
      </div>
  );
};

export default MainPage;
