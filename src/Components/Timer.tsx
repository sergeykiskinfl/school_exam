import { Box, HStack, Text } from "@chakra-ui/react";

// Компонент для отображения таймера отчета времени
function Timer({ seconds }: { seconds: number }) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder =
    seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60);

  return (
    <Box
      px={3}
      py={0.5}
      w="fit-content"
      border="2px"
      borderRadius="3px"
      borderColor="gray.400"
      color="gray.700"
    >
      <HStack spacing={1}>
        <Text>{minutes}</Text>
        <Text>:</Text>
        <Text>{secondsRemainder}</Text>
      </HStack>
    </Box>
  );
}

export default Timer;
