import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answers-repository'

const fakeAnswerRepository: AnswerRepository = {
  create: async () => {
    return
  },
}

it('should create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
