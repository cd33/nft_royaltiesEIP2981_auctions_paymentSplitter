import React, {useState} from 'react'
import * as s from '../styles/globalStyles'
import NFTRenderer from './NFTRenderer'

const ContentBuyNft = ({
  loading,
  buyNFT,
  myNFTs,
  balanceContractNFT,
}) => {

  const [selectedNFT, setSelectedNFT] = useState(null)

  return (
    <>
      <s.TextTitle>ARKANIA MES NFTs</s.TextTitle>
      <s.TextSubTitle style={{ marginTop: 0 }}>
        Veuillez choisir un NFT à acheter
      </s.TextSubTitle>

      <s.Container fd="row" ai="center" jc="center">
        <div style={{ flexDirection: 'row' }}>
          <s.Select onChange={(e) => setSelectedNFT(e.target.value)}>
            <option value="">Choisissez un NFT</option>
            {balanceContractNFT.map((balance, i) => {
              if (balance !== '0') {
                return (
                  <option key={i+1} value={i+1}>
                    NFT #{i+1}
                  </option>
                )
              } else return ''
            })}
          </s.Select>

          <s.ButtonTop
            disabled={loading || !selectedNFT ? 1 : 0}
            onClick={() => buyNFT(selectedNFT)}
            primary={loading || !selectedNFT ? '' : 'primary'}
          >
            BUY NFT
          </s.ButtonTop>
        </div>
      </s.Container>
      <s.SpacerSmall />
      {!myNFTs && <s.TextSubTitle>Acheter votre premier NFT</s.TextSubTitle>}

      {myNFTs &&
        myNFTs.length > 0 &&
        myNFTs.map((myNFT) => (
          <s.Container jc="center" fd="row" key={myNFT}>
            <NFTRenderer myNFT={myNFT} size={450} />
          </s.Container>
        ))}
    </>
  )
}

export default ContentBuyNft
