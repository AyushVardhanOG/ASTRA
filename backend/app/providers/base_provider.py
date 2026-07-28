from abc import ABC, abstractmethod


class BaseAIProvider(ABC):

    @abstractmethod
    async def generate(self, prompt: str):
        """
        Generate a complete response.
        """
        pass

    @abstractmethod
    async def stream_generate(self, prompt: str):
        """
        Stream the response chunk-by-chunk.
        """
        pass