import { RefObject } from "react";

export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null> | RefObject<HTMLButtonElement>) => {
   const getDropdownPosition = () => {
      if (!ref.current) return {top: 0, left: 0};

      const rect = ref.current.getBoundingClientRect();
      const dropdownWidth = 240; // Width of the dropdown

      // Calculate the position of the dropdown
      const top = rect.bottom + window.scrollY;
      let left = rect.left + window.scrollX;

      // Check if dropdown would go off the right edge of the viewport
      if (left + dropdownWidth > window.innerWidth) {
         left = rect.right + window.scrollX - dropdownWidth;
         
         // If still off-screen align to the right edge of the viewport with some padding
         if (left < 0) {
            left = window.innerWidth - dropdownWidth - 16;
         }

         // Ensure dropdown doesn't go off the left edge of the viewport
         if (left < 0) {
            left = 16;
         }
         return {top, left};
      }

      return {top, left};
   }

   return { getDropdownPosition };
}