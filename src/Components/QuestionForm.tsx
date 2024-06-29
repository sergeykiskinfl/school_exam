import {
  VStack,
  Radio,
  RadioGroup,
  Button,
  Text,
  Checkbox,
  Input,
  Textarea,
  Box,
} from "@chakra-ui/react";

import {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";

import { Question } from "../interfaces";
import { FormEvent } from "react";

import { memo } from "react";
import { forwardRef } from "react";

interface Props {
  question: Question;
  setCurrentQuestionNumber: Dispatch<SetStateAction<number>>;
  currentQuestionNumber: number;
}

// Форма для отображения вопроса
const QuestionForm = memo(
  forwardRef(
    (
      {
        question: { title, type, options, rightAnswers },
        setCurrentQuestionNumber,
        currentQuestionNumber,
      }: Props,
      ref
    ) => {
      const [savedAnswers, setSavedAnswers] = useState<string[]>([]);

      const textRef = useRef("");

      const amountOfRightAnswers = ref as MutableRefObject<number>;

      let content;

      switch (type) {
        case "radio":
          content = (
            <RadioGroup
              onChange={(e) => {
                setSavedAnswers([e]);
              }}
              colorScheme="red"
              name="form-content"
            >
              <VStack spacing="12px" alignItems="flex-start" marginBottom={5}>
                {options?.map((option) => {
                  return (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  );
                })}
              </VStack>
            </RadioGroup>
          );
          break;
        case "checkbox":
          content = (
            <VStack spacing="12px" alignItems="flex-start" marginBottom={5}>
              {options?.map((option) => {
                return (
                  <Checkbox
                    isChecked={savedAnswers.includes(option)}
                    key={option}
                    value={option}
                    colorScheme="red"
                    onChange={() => {
                      const prevSavedAnswers = [...savedAnswers];

                      if (prevSavedAnswers.includes(option)) {
                        const currentSavedAnswers = prevSavedAnswers.filter(
                          (item) => item !== option
                        );
                        setSavedAnswers(currentSavedAnswers);
                      } else {
                        setSavedAnswers((prev) => [...prev, option]);
                      }
                    }}
                  >
                    {option}
                  </Checkbox>
                );
              })}
            </VStack>
          );
          break;
        case "text":
          content = (
            <Input
              colorScheme="red"
              marginBottom={5}
              variant="outline"
              placeholder="Ваш вариант ответа"
              maxLength={50}
              onChange={(e) => (textRef.current = e.target.value)}
              isRequired
            />
          );
          break;
        case "multi-text":
          content = (
            <Textarea
              colorScheme="red"
              marginBottom={5}
              placeholder="Ваш вариант ответа"
              maxLength={200}
              onChange={(e) => (textRef.current = e.target.value)}
              isRequired
            />
          );
          break;
      }

      function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        switch (type) {
          case "radio":
          case "checkbox":
            if (
              savedAnswers.every((item) => rightAnswers.includes(item)) &&
              savedAnswers.length === rightAnswers.length
            ) {
              localStorage.setItem(
                "amountOfRightAnswers",
                JSON.stringify(++amountOfRightAnswers.current)
              );
            }
            break;
          case "text":
          case "multi-text":
            if (rightAnswers.includes(textRef.current)) {
              localStorage.setItem(
                "amountOfRightAnswers",
                JSON.stringify(++amountOfRightAnswers.current)
              );
            }
            break;
        }

        setSavedAnswers([]);
        localStorage.setItem(
          "currentQuestionNumber",
          JSON.stringify(currentQuestionNumber + 1)
        );
        setCurrentQuestionNumber((prev) => prev + 1);
      }

      return (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="form-content">
            <Text fontWeight="bold" marginBottom={5} marginTop={5}>
              {title}
            </Text>
          </label>
          <Box maxW="1000px">{content}</Box>
          <Button colorScheme="red" type="submit">
            Отправить
          </Button>
        </form>
      );
    }
  )
);

export default QuestionForm;
