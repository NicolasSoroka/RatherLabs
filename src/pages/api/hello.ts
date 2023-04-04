import type { NextApiRequest, NextApiResponse } from 'next'
import { mockData } from './quizdata'; 
import { surveyDataType } from '../../utils/types';

export default function getQuiz(
  req: NextApiRequest,
  res: NextApiResponse<surveyDataType>
) {
  res.status(200).json(mockData);
}