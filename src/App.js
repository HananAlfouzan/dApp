import logo from './logo.svg';
import './App.css';
import {injected} from './components/wallet/connectors'
import {useWeb3React} from '@web3-react/core'
import {Web3ReactProvider, getWeb3ReactContext} from '@web3-react/core'
import {Web3Provider} from '@ethersproject/providers'
import {ethers, Contract} from 'ethers'
import React from 'react' 
import { getAccountPath } from 'ethers/lib/utils';
import {useState} from 'react'

export default function App() {
const InteractiveArea = () => {
     
    const abi = [
      {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "num",
            "type": "uint256"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
     const [number, changeNumber] = useState(0)

     function decreaseNumber () {
        changeNumber(number -1 )
     }

     function increaseNumber(){
      changeNumber(number +1 )
     }
     const context = useWeb3React()
     const {chainId, provider, activate,account, deactivate} = context
     const walletAddress = account
     const connectWallet= () => {
       activate(injected)
     }

     const disconnectWallet= () => {
       deactivate(injected)
     }
    //connect to smart contract

    const cAddr= "0x1B710a880BdC4Cb2B19ee05EB0BAc2eE167c4053" // Smart Contract Address
    async function getNumber (){
       const provider = new ethers.providers.Web3Provider(window.ethereum)
       const contract = new Contract(cAddr,abi,provider)
       const numberOnTract = await contract.retrieve()
       console.log("number from contract: "+ numberOnTract)
    }

    async function setNumber (){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signed = await provider.getSigner()
      const contract = new Contract(cAddr,abi,signed)
      
      await contract.store(number)
      //console.log("number from contract: "+ numberOnTract)
    }

    return(
      <div>
      <div>
        <button onClick={connectWallet}>Connect</button>
        <span>Connected Address:{walletAddress}</span>
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>

      <div>
      <button onClick={getNumber}>getNumber</button>
      <button onClick={setNumber}>setNumber</button>
      </div>
      <br></br>
      <div>
      <button onClick={decreaseNumber}>-</button>
      Number: {number}
      <button onClick={increaseNumber}>+</button>
      </div>
      </div>
    )



   }
  function getLibraryf(provider) {
    const library = new Web3Provider(provider )
    library.pollingInterval = 12000;
    return library;
  }

  return (
    <Web3ReactProvider getLibrary={getLibraryf}>
      <InteractiveArea />
    </Web3ReactProvider>
  )
}


    // const cAddr = 

    // const getReadOnlyContract = () => {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum)
    //   const contract = new Contract(cAddr, abi, provider)
    //   return contract
    // }

    // async function getActiveContract() {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum)
    //   const signed = await provider.getSigner()
    //   const contract = new Contract(cAddr, abi, provider)
    //   return contract
    // }


    // async function getNumber() {
    //   const contract = getReadOnlyContract()
    //   const numberOnTract = await contract.retrieve() 
    //   console.log('number from contract' + numberOnTract)
    
    // }

    // async function storeNumber() {
    //   const contract = getActiveContract()
    //   await contract.store(70)

    // }