# React + TypeScript + Vite

================

IMPORTANT! INSTALL TO RUN: REACT ROUTER DOM
  > npm install react-router-dom

================
  > npm run dev; "o" + enter

================

                       < ---WORK IN PROGRESS.--- >

      Current Progress:
      - pseudo database
      - CRUD function commands
================
- Final Functions should be:
  1. Access Control (NO PASSWORDS; TOO TIME CONSUMING TO DEVELOP) (seperate pages for suppliers and managers)
  2. Listings of Managers, Suppliers, and Storage
  3. Adding/Removing/Updating Storage Items and their details
  4. AI chatbot based on current inventory
    (how many are left, what should be stocked next, what supplier, etc.)(?)
================
- Initial storage data is in ../data/database.ts
  > App.tsx will read the initial data from this file and make a copy via useState
  > No actual back end, sadly

- For temporary demonstration purposes on showing suppliers,
 items, and manager list(and their requirements): 
    go to <localhost>: / | /items | /managers | /suppliers | /items/new | /managers/new | /suppliers/new


===============

  NOTE: FILES THAT ARE NOT NEEDED: /types/index.ts
                                      > Only used as a reference at this point.