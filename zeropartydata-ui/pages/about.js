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
  async function navigate() {
    router.push('/create-post')
  }

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
        {
          
          <button className={buttonStyle} onClick={navigate}>
              Create your first post
              <img
                src='/right-arrow.svg'
                alt='Right arrow'
                className={arrow}
              />
            </button>
          
        }
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
