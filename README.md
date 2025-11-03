# Pepper House Feedback

Egyszerű Next.js alkalmazás Tailwind CSS-sel, amely a Pepper House vendégelégedettségi űrlapját jeleníti meg. A projekt Vercelre történő telepítéshez készült.

## Fejlesztői parancsok

```bash
npm install
npm run dev
```

A projekt buildeléséhez és futtatásához:

```bash
npm run build
npm start
```

## Feltöltés GitHubra

1. Hozz létre egy üres GitHub repót, majd másold ki az URL-jét (pl. `https://github.com/felhasznalo/pepper-house-feedback.git`).
2. Add hozzá a távoli repót a helyi projektedhez:

   ```bash
   git remote add origin https://github.com/felhasznalo/pepper-house-feedback.git
   ```

3. Ellenőrizd, melyik ágon dolgozol:

   ```bash
   git branch --show-current
   ```

   - Ha az eredmény `main`, akkor használd az alábbi parancsot:

     ```bash
     git push -u origin main
     ```

   - Ha például egy `work` nevű ágon vagy, akkor így tudod feltölteni:

     ```bash
     git push -u origin work
     ```

   A `-u` kapcsoló beállítja az upstreamet, így a későbbi `git push` és `git pull` parancsok már automatikusan a megfelelő ágra mutatnak.

4. Ha később újabb módosításokat végzel, használd a `git push` parancsot a frissítések feltöltéséhez. Ugyanez igaz arra is, ha több ágat szeretnél a távoli repóba feltölteni (pl. `git push origin main`).

Ezt követően a repó importálható Vercelbe, ahol a deploy automatikusan lefut a `main` ágra érkező pushok után.
