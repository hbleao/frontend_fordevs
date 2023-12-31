import { faker } from '@faker-js/faker'

import { RemoteAddAccount } from '.'

import { AddAccountParams } from '@/domain/useCases'
import { AccountModel } from '@/domain/models'
import { HttpPostClientSpy } from '@/data/test'
import { mockAccount, mockAddAccountParams } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteAddAccount', () => {
  it('should call HttpPostClient with correct url', async () => {
    makeSut()
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccountParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call HttpPostClient with correct body', async () => {
    makeSut()
    const url = faker.internet.url()
    const addAccountParams = mockAddAccountParams()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(addAccountParams)

    expect(httpPostClientSpy.body).toBe(addAccountParams)
  })

  it('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccount()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }

    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(httpResult)
  })

  it('should throw EmailInUserError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }

    const promise = sut.add(mockAddAccountParams())
    expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('should throw EmailInUserError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const promise = sut.add(mockAddAccountParams())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw NotFound if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    }

    const promise = sut.add(mockAddAccountParams())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw InternalServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.internalServerError,
    }

    const promise = sut.add(mockAddAccountParams())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
