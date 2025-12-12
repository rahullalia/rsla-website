import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from './client'

const imageBuilder = createImageUrlBuilder({
    projectId: projectId || '36wenybq',
    dataset: dataset || 'production',
})

export const urlForImage = (source: any) => {
    if (!source) return null
    return imageBuilder.image(source)
}
