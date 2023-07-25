import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = await makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'New title',
      content: 'New question content',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New question content',
    })
  })

  it('should not be able to edit a question of another user', async () => {
    const newQuestion = await makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    expect(async () => {
      await sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'author-2',
        title: 'New title',
        content: 'New question content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
