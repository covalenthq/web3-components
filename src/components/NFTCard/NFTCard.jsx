import { useState, useEffect } from 'react'
import { Card } from 'antd'
import { getDataFromCovalentAPI } from '../../utils/api'
import { pruneNftCardData } from '../../utils/nftCardHelper'
import defaultNftLogo from '../../assets/default-nft-logo.png'
const { Meta } = Card

const NFTCard = ({ chainId, contractAddress, tokenId, cardWidth, cardHeight }) => {
  const [NFTData, setNFTData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (contractAddress) {
      fetchData()
    }
  }, [chainId, contractAddress, tokenId])

  const handleImgError = (e) => {
    e.target.src = defaultNftLogo
  }

  const fetchData = () => {
    setError(false)
    setIsLoading(true)

    const URL = `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/`
    getDataFromCovalentAPI(URL)
      .then((response) => {
        console.log(response.data)
        setIsLoading(false)
        const pruneData = pruneNftCardData(response.data)
        setNFTData(pruneData)
      })
      .catch((e) => {
        setError(true)
        console.log(e)
      })
  }

  if (error) {
    return <p> Unable to fetch data</p>
  } else if (isLoading) {
    return <Card loading={true} style={{ width: cardWidth, height: cardHeight }}></Card>
  } else if (!isLoading && NFTData) {
    return (
      <Card
        loading={isLoading}
        hoverable
        style={{
          width: cardWidth,
          height: cardHeight
        }}
        cover={<img alt="NFT image" onError={handleImgError} src={NFTData.image} />}>
        <Meta
          style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          title={NFTData.name}
          description={NFTData.description}
        />
      </Card>
    )
  }
}

export default NFTCard
