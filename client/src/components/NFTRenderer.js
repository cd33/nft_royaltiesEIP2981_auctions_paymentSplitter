import React, { useState, useRef } from 'react'
import classnames from 'classnames'
import { useIntersection } from './intersectionObserver'
import '../styles/imageRenderer.scss'

const NFTRenderer = ({ myNFT = null, size, style }) => {
  const nftStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
  }

  const ImageRenderer = ({ url, thumb, width, height }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(false)
    const imgRef = useRef()
    useIntersection(imgRef, () => {
      setIsInView(true)
    })

    const handleOnLoad = () => {
      setIsLoaded(true)
    }
    return (
      <div
        className="image-container"
        ref={imgRef}
        style={{
          paddingBottom: `${(height / width) * 100}%`,
          width: '100%',
        }}
      >
        {isInView && (
          <>
            <img
              className={classnames('image', 'thumb', {
                ['isLoaded']: !!isLoaded,
              })}
              alt={'nft_thumb'}
              src={thumb}
              style={nftStyle}
            />
            <img
              className={classnames('image', {
                ['isLoaded']: !!isLoaded,
              })}
              alt={'myNFT'}
              src={url}
              onLoad={handleOnLoad}
              style={nftStyle}
            />
          </>
        )}
      </div>
    )
  }

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        position: 'relative',
        ...style,
      }}
    >
      <ImageRenderer
        key={myNFT}
        url={`https://gateway.pinata.cloud/ipfs/Qmebt3juLDXLp8D5AJvYrUGs2Kr92HkxXYNWdQngMcsa4h/${myNFT}.png`}
        thumb={`https://gateway.pinata.cloud/ipfs/Qmebt3juLDXLp8D5AJvYrUGs2Kr92HkxXYNWdQngMcsa4h/${myNFT}.png`}
        width={size}
        height={size}
      />
    </div>
  )
}

export default NFTRenderer
