import React, { useState } from 'react'
import * as s from '../styles/globalStyles'
import NFTRenderer from './NFTRenderer'

const ContentAuction = ({
  loading,
  bid,
  claimRewards,
  auctions,
  account,
  timeStamp,
}) => {
  const [amount, setAmount] = useState(null)

  return (
    <s.Container ai="center" flex="1">
      <s.TextTitle>ARKANIA AUCTIONS</s.TextTitle>

      {auctions &&
        auctions.length > 0 &&
        auctions.map((auction) => (
          <s.ContainerCardAuction
            key={auction.tokenId}
            bc="#3aa7e6"
            border="2px solid"
            style={{ borderRadius: 50, margin: 50 }} //, width: "90%"
          >
            <s.Container fd="row">
              <NFTRenderer myNFT={auction.tokenId} size={450} />

              <s.Container flex="1" ai="center" style={{ marginLeft: 50 }}>
                <s.TextSubTitle fs="24" style={{ marginBottom: 5 }}>
                  ARKANIA NFT #{auction.tokenId}
                </s.TextSubTitle>
                <s.TextSubTitle fs="24" style={{ marginBottom: 5 }}>
                  Highest Bidder:{' '}
                  {auction.highestBidder ===
                  '0x0000000000000000000000000000000000000000'
                    ? 'Aucun acheteur'
                    : auction.highestBidder}
                </s.TextSubTitle>
                <s.TextSubTitle fs="24" style={{ marginBottom: 5 }}>
                  Current Price: {auction.price / 1000000000000000000} ETH
                </s.TextSubTitle>
                <s.SpacerLarge />
                {auction.finished ? (
                  <s.TextTitle fs="40">SOLD</s.TextTitle>
                ) : (
                  <>
                    {auction.timeStamp === '0' ||
                    auction.timeStamp > timeStamp - 120 ? (
                      <>
                        <div style={{ position: 'relative' }}>
                          <input
                            style={{ padding: 10, borderRadius: 5 }}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <span
                            style={{ position: 'absolute', right: 8, top: 8 }}
                          >
                            ETH
                          </span>
                        </div>
                        <s.ButtonTop
                          disabled={loading || !amount ? 1 : 0}
                          onClick={() => bid(auction.tokenId, amount)}
                          primary={loading || !amount ? '' : 'primary'}
                        >
                          BID
                        </s.ButtonTop>
                      </>
                    ) : (
                      <>
                        <s.TextTitle fs="40">SOLD</s.TextTitle>
                        {account === auction.highestBidder && (
                          <s.ButtonTop
                            disabled={loading ? 1 : 0}
                            onClick={() => claimRewards(auction.tokenId)}
                            primary={loading ? '' : 'primary'}
                          >
                            CLAIM YOUR NFT
                          </s.ButtonTop>
                        )}
                      </>
                    )}
                  </>
                )}
              </s.Container>
            </s.Container>
          </s.ContainerCardAuction>
        ))}
    </s.Container>
  )
}

export default ContentAuction
