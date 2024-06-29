import { Box, Flex } from "@chakra-ui/react";
import { memo } from "react";

interface Props {
  amountOfQuestions: number;
  currentQuestionNumber: number;
}

// Компонент визуально отображающий номер текущего вопроса
const ProgressBar = memo(
  ({ amountOfQuestions, currentQuestionNumber }: Props) => {
    return (
      <Flex alignItems="center" gap="1" marginTop={5}>
        {Array.from({ length: amountOfQuestions }).map((_, index) => {
          return (
            <Box
              key={index}
              h={2}
              w={50}
              backgroundColor={
                index === currentQuestionNumber
                  ? "red"
                  : index > currentQuestionNumber
                  ? "gray"
                  : "black"
              }
            />
          );
        })}
      </Flex>
    );
  }
);

export default ProgressBar;
