import { request } from 'utils/request'

export const find = async ({ area, rows }) => {
  return await request({
    query: `&rows=${rows}&facet=geo_local_area&refine.geo_local_area=${area}`,
  })
}
