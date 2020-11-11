import ky from 'ky'

const baseURL = `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters`

/**
 * HTTP Client
 * @param {String} param query
 */
export const request = async ({ query }) => {
  const response = await ky(`${baseURL}${query}`, {
    method: 'GET',
  })

  return await response.json()
}
