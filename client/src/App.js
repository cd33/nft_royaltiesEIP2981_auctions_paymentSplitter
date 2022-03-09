import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Arkania from './contracts/ArkaniaNFT.json'
import getWeb3 from './getWeb3'
import * as s from './styles/globalStyles'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import ContentBuyNft from './components/ContentBuyNft'
import ContentAuction from './components/ContentAuction'

const App = () => {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [arkania, setArkania] = useState(null)
  const [myNFTs, setMyNFTs] = useState(null)
  const [auctions, setAuctions] = useState(null)
  const [balanceContractNFT, setBalanceContractNFT] = useState([])
  const [timeStamp, setTimeStamp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [titleModal, setTitleModal] = useState(false)
  const [contentModal, setContentModal] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3()
        web3.eth.handleRevert = true

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts()

        if (window.ethereum) {
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccounts({ accounts })
            window.location.reload()
          })

          window.ethereum.on('chainChanged', (_chainId) =>
            window.location.reload(),
          )
        }

        const networkId = await web3.eth.net.getId()
        if (networkId !== 1337 && networkId !== 4) {
          handleModal('Wrong Network', 'Please Switch to the Rinkeby Network')
          return
        }

        // Load ArkaniaNFT and the NFTs
        const arkaniaData = Arkania.networks[networkId]
        const arkania = new web3.eth.Contract(
          Arkania.abi,
          arkaniaData && arkaniaData.address,
        )
        setArkania(arkania)

        await arkania.methods
          .getAuctions()
          .call({ from: accounts[0] })
          .then((res) => setAuctions(res))

        let lastBlockNumber = await web3.eth.getBlockNumber()
        let lastBlockInfo = await web3.eth.getBlock(lastBlockNumber)
        setTimeStamp(lastBlockInfo.timestamp)

        await arkania.methods
          .getMyNFTs()
          .call({ from: accounts[0] })
          .then((res) => setMyNFTs(res))

        let balanceContractNFT = []
        for (let i = 1; i <= 10; i++) {
          await arkania.methods
            .balanceOf(arkania._address, i)
            .call({ from: accounts[0] })
            .then((res) => balanceContractNFT.push(res))
        }
        setBalanceContractNFT(balanceContractNFT)

        // Subscribe to the contract states to update the front states
        web3.eth.subscribe('newBlockHeaders', async (err, res) => {
          if (!err) {
            await arkania.methods
              .getAuctions()
              .call({ from: accounts[0] })
              .then((res) => setAuctions(res))

            let lastBlockNumber = await web3.eth.getBlockNumber()
            let lastBlockInfo = await web3.eth.getBlock(lastBlockNumber)
            setTimeStamp(lastBlockInfo.timestamp)

            await arkania.methods
              .getMyNFTs()
              .call({ from: accounts[0] })
              .then((res) => setMyNFTs(res))

            let balanceContractNFT = []
            for (let i = 1; i <= 10; i++) {
              await arkania.methods
                .balanceOf(arkania._address, i)
                .call({ from: accounts[0] })
                .then((res) => balanceContractNFT.push(res))
            }
            setBalanceContractNFT(balanceContractNFT)
          }
        })

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3)
        setAccounts(accounts)
      } catch (error) {
        // Catch any errors for any of the above operations.
        handleModal(
          'Error',
          `Failed to load web3, accounts, or contract. Check console for details.`,
        )
        console.error(error)
      }
    }
    init()
  }, [])

  // EVENTS
  useEffect(() => {
    if (arkania !== null && web3 !== null) {
      arkania.events
        .NFTBought()
        .on('data', (event) =>
          handleModal(
            'Congratulations !',
            `You bought the NFT #${event.returnValues.nftId}.`,
          ),
        )
        .on('error', (err) => handleModal('Error', err.message))

      arkania.events
        .AuctionBidden()
        .on('data', (event) =>
          handleModal(
            'With a bit of luck...',
            `You bid ${
              event.returnValues._price / 1000000000000000000
            }ETH on the NFT #${event.returnValues._tokenId}.`,
          ),
        )
        .on('error', (err) => handleModal('Error', err.message))

      arkania.events
        .AuctionFinished()
        .on('data', (event) =>
          handleModal(
            'Congratulations !',
            `You bought the NFT #${event.returnValues._tokenId}`,
          ),
        )
        .on('error', (err) => handleModal('Error', err.message))
    }
  }, [arkania, web3])

  const bid = (_nftId, amount) => {
    setLoading(true)
    arkania.methods
      .bid(_nftId)
      .send({
        from: accounts[0],
        value: web3.utils.toWei(amount, 'Ether'),
      })
      .once('error', (err) => {
        setLoading(false)
        handleModal('Error', err.message)
      })
      .then((res) => {
        setLoading(false)
      })
  }

  const claimRewards = (_nftId) => {
    setLoading(true)
    arkania.methods
      .claimRewards(_nftId)
      .send({
        from: accounts[0],
      })
      .once('error', (err) => {
        setLoading(false)
        handleModal('Error', err.message)
      })
      .then((res) => {
        setLoading(false)
      })
  }

  const buyNFT = (_nftId) => {
    setLoading(true)
    arkania.methods
      .buyNFT(_nftId)
      .send({
        from: accounts[0],
        value: web3.utils.toWei('0.001', 'Ether'),
      })
      .once('error', (err) => {
        setLoading(false)
        handleModal('Error', err.message)
      })
      .then((res) => {
        setLoading(false)
      })
  }

  const handleModal = (title, content) => {
    setTitleModal(title)
    setContentModal(content)
    setModalShow(true)
  }

  return (
    <s.Screen>
      <s.Container ai="center" flex={1} bc="#36468e" style={{ paddingTop: 80 }}>
        {!web3 || !accounts ? (
          <s.TextTitle style={{ alignSelf: 'center' }}>
            Loading Web3, accounts, and contract...
          </s.TextTitle>
        ) : (
          <Routes>
            <Route path="/" element={<Navbar accounts={accounts} />}>
              <Route
                index
                element={
                  <ContentAuction
                    loading={loading}
                    bid={bid}
                    claimRewards={claimRewards}
                    auctions={auctions}
                    account={accounts[0]}
                    timeStamp={timeStamp}
                  />
                }
              />
              <Route
                path="MyNFTs"
                element={
                  <ContentBuyNft
                    loading={loading}
                    buyNFT={buyNFT}
                    myNFTs={myNFTs}
                    balanceContractNFT={balanceContractNFT}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <s.TextTitle fs="80" style={{ marginTop: 80 }}>
                      Il n'y a rien ici !
                    </s.TextTitle>
                    <s.ButtonHome>
                      <s.ButtonLink to="/">Accueil</s.ButtonLink>
                    </s.ButtonHome>
                  </>
                }
              />
            </Route>
          </Routes>
        )}
        <Modal
          modalShow={modalShow}
          setModalShow={setModalShow}
          title={titleModal}
          content={contentModal}
        />
      </s.Container>
    </s.Screen>
  )
}

export default App
