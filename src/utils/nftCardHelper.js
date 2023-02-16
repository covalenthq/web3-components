export const pruneNftCardData = (response) => {
  const nftData = response.items[0]
  const image = nftData.nft_data[0].external_data.image
  const description = nftData.nft_data[0].external_data.description
  const owner = nftData.nft_data[0].owner
  const name = nftData.nft_data[0].external_data.name
  return {
    image,
    description,
    owner,
    name
  }
}
