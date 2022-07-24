/* pages/index.js */
import { css } from '@emotion/css'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Link from 'next/link'
import { AccountContext } from '../context'

/* import contract address and contract owner address */
import {
  contractAddress, ownerAddress
} from '../utils/config'

/* import Application Binary Interface (ABI) */
import ZeroPartyDataAbi from '../utils/abiFiles/ZeroPartyData.json'
//import sudokuContractAbi from "../utils/abiFiles/Sudoku.json";
//import { sudokuCalldata } from "../zkproof/sudoku/snarkjsSudoku";
import { zpdCalldata } from "../zkproof/zeroPartyData/snarkjsZPD"

//import contractAddress from "../utils/contractsaddress.json";



export default function Home(props) {
  /* posts are fetched server side and passed in as props */
  /* see getServerSideProps */
  const { posts } = props
  const account = useContext(AccountContext)

  //const [sudokuInitial, setSudokuInitial] = useState([]);
  const [zpdInputs, setZpdInputs] = useState([]);

  const [loadingVerifyBtn, setLoadingVerifyBtn] = useState(false);
  
  const router = useRouter()
  async function navigate() {
    router.push('/create-post')
  }

  async function savePost(hash) {
    /* anchor post to smart contract */
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Vault.abi, signer)
      console.log('contract: ', contract)
      try {
        const val = await contract.createPost(post.title, hash)
        /* optional - wait for transaction to be confirmed before rerouting */
        /* await provider.waitForTransaction(val.hash) */
        console.log('val: ', val)
      } catch (err) {
        console.log('Error: ', err)
      }
    }    
  }

  async function VerifyProof(){
    result = await contract.VerifyProof(
      calldata.a,
      calldata.b,
      calldata.c,
      calldata.Input
    );
  }

  const verifyZPD = async () => {
    console.log("Address", dataAccount?.address);
    calculateProof();
  };
  
  const calculateProof = async () => {
      
    setLoadingVerifyBtn(true);
    console.log("zpdInputs", zpdInputs);
    
    let calldata = await zpdCalldata(0, 1, 6000, 0, 18,  5000);

    if (!calldata) {
      setLoadingVerifyBtn(false);
      return "Invalid inputs to generate witness.";
    }

    // console.log("calldata", calldata);

    try {
      let result;
      
      result = await contract.verifyProof(
        calldata.a,
        calldata.b,
        calldata.c,
        calldata.Input
      );
      
      // if (
      //   dataAccount?.address &&
      //   activeChain.id.toString() === networks.selectedChain
      // ) {
      //   result = await contract.verifySudoku(
      //     calldata.a,
      //     calldata.b,
      //     calldata.c,
      //     calldata.Input
      //   );
      // } else {
      //   result = await contractNoSigner.verifySudoku(
      //     calldata.a,
      //     calldata.b,
      //     calldata.c,
      //     calldata.Input
      //   );
      // }
      console.log("result", result);
      setLoadingVerifyBtn(false);
      alert("Successfully verified");
    } catch (error) {
      setLoadingVerifyBtn(false);
      console.log(error);
      alert("Wrong solution");
    }
  };

  // const verifySudoku = async () => {
  //   console.log("Address", dataAccount?.address);
  //   calculateProof();
  // };


  return (
    <div>
      <div className={postList}>
        {
          /* map over the posts array and render a button with the post title */
          // posts.map((post, index) => (
          //   <Link href={`/post/${post[2]}`} key={index}>
          //     <a>
          //       <div className={linkStyle}>
          //         <p className={postTitle}>{post[1]}</p>
          //         <div className={arrowContainer}>
          //         <img
          //             src='/right-arrow.svg'
          //             alt='Right arrow'
          //             className={smallArrow}
          //           />
          //         </div>
          //       </div>
          //     </a>
          //   </Link>
          // ))
        }
      </div>
      <div className={container}>

        <button onClick={verifyZPD}
        disabled={loadingVerifyBtn}>
          Verify Sudoku
        </button>
        
          
          {/* <button
        className="flex items-center justify-center w-full px-5 py-3 space-x-3 text-lg font-medium rounded-md disabled:cursor-not-allowed verify-btn bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500"
        onClick={verifySudoku}
        disabled={loadingVerifyBtn}
        >
        {loadingVerifyBtn && <div className={styles.loader}></div>}
        <span>Verify Sudoku</span>
      </button> */}
      
        
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  /* here we check to see the current environment variable */
  /* and render a provider based on the environment we're in */
  let provider
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  }

  const contract = new ethers.Contract(contractAddress, ZeroPartyDataAbi, provider)
  //const data = await contract.fetchPosts()
  return {
    props: {
       //posts: JSON.parse(JSON.stringify(data))
     }
  }
}

const arrowContainer = css`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-right: 20px;
`

const postTitle = css`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  margin: 0;
  padding: 20px;
`

const linkStyle = css`
  border: 1px solid #ddd;
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
`

const postList = css`
  width: 700px;
  margin: 0 auto;
  padding-top: 50px;  
`

const container = css`
  display: flex;
  justify-content: center;
`

const buttonStyle = css`
  margin-top: 100px;
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 44px;
  padding: 20px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`

const arrow = css`
  width: 35px;
  margin-left: 30px;
`

const smallArrow = css`
  width: 25px;
`
