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
import ZeroPartyData from '../utils/abiFiles/ZeroPartyData.json'

export default function About(props) {
  /* posts are fetched server side and passed in as props */
  /* see getServerSideProps */
  const { posts } = props
  const account = useContext(AccountContext)

  const router = useRouter()

  return (
    <div>
      <div className={container}>
        <div className="grid place-items-center">
          <div className="flex items-center justify-center mb-10 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
            zeroPartyData
          </div>
          <div className="flex items-center justify-center w-auto text-lg md:w-96 text-slate-300">
            zeroPartData project uses Zero Knowledge Proof to verify eligibility for gifts & discount offers by Brands.
          </div>
        </div>
      </div>
    </div>
  )
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
