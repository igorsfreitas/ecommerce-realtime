'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Image = use('App/Models/Image')
const { manage_single_upload, manage_multiple_uploads } = use('/App/Helpers')
const fs = use('fs')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, pagination, transform }) {
    let images = await Image.query().orderBy('id', 'DESC').paginate(pagination.page, pagination.limit)
    images = await transform.paginate(images, ImageTransformer)
    return response.send(images)
  }
  
  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, transform }) {
    try {
      const fileJar = request.file('images', {
        types: ['image'],
        size: '2mb'
      })

      let images = []

      if(!fileJar.files){
        const file = await manage_single_upload(fileJar)
        if(file.moved()){
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
          })

          const transformedImage = await transform.item(image, ImageTransformer)

          images.push(transformedImage)
          return response.status(201).send({
            successes: images,
            errors: {}
          })
        }else{
          return response.status(400).send({
            message: 'Não foi possível processar a imagem'
          })
        }
      }

      let files = await manage_multiple_uploads(fileJar)
      await Promise.all(
        files.successes.map(async file => {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
          })
          const transformedImage = await transform.item(image, ImageTransformer)
          images.push(transformedImage)
        })
      )
      return response.status(201).send({
        successes: images,
        errors: files.error
      })
    } catch (error) {
      return response.status(400).send({
        message: 'Não foi possível processar a sua imagem(s)'
      })
    }
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, transform }) {
    let image = Image.findOrFail(params.id)
    image = await transform.item(image, ImageTransformer)
    return response.send(image)
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, transform }) {
    let image = Image.findOrFail(params.id)
    try {
      image.merge( request.only(['original_name']) )
      await image.save()
      image = await transform.item(image, ImageTransformer)
      response.status(200).send(image)
    } catch (error) {
      response.status(400).send({
        message: 'Não foi possível atualizar esta imagem'
      })
    }
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const image = Image.findOrFail(params.id)
    try {
      
      let filePath = Helpers.publicPath(`uploads/${image.path}`)

      fs.unlinkSync(filePath)
      await image.delete()
      return response.status(204).send()
    } catch (error) {
      response.status(400).send({
        message: 'Não foi possível deletar esta imagem'
      })
    }
  }
}

module.exports = ImageController
