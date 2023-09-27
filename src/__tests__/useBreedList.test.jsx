import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";
import { renderHook, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test("returns empty array when no animal is passed", async () => {
  const breeds = [
    "Havaese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador Retriever",
    "French Bulldog",
  ];

  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    }),
  );
  const { result } = renderHook(() => useBreedList(), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
  await waitFor(() => {
    expect(result.current[1]).toBe("success");
  });
  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});
