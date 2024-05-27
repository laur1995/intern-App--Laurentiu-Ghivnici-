import React, { useEffect, useState } from "react";

import { currentEnvironment } from "@constants";

import styles from "./users.module.scss";

type Gender = "female" | "male" | "";

type User = {
  gender: Gender;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>("");
  const [pageToGet, setPageToGet] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async (page: number, selectedGender: Gender) => {
    setLoading(true);
    try {
      const result = await fetch(
        `${currentEnvironment.api.baseUrl}?results=5&gender=${selectedGender}&page=${String(page)}`
      );
      const data = await result.json();

      if (result.ok) {
        if (page === 1) {
          setUsers(data.results);
        } else {
          setUsers((oldUsers) => [...oldUsers, ...data.results]);
        }
        setError(null);
      } else {
        setError("Failed to fetch users");
      }
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageToGet(1);
  }, [gender]);

  useEffect(() => {
    void getUsers(pageToGet, gender);
  }, [pageToGet, gender]);

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <label htmlFor="gender">Gender: </label>
        <select
          className={styles.select}
          id="gender"
          name="gender"
          onChange={(event) => setGender(event.target.value as Gender)}
        >
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>

      {loading ? <div className={styles.loading}>Loading...</div> : null}
      {error ? <div className={styles.error}>{error}</div> : null}

      <ul className={styles.userList}>
        {users.length > 0 &&
          users.map((user: User) => (
            <li key={user.login.uuid} className={styles.userCard}>
              {user.name.first} {user.name.last} ({user.gender})
            </li>
          ))}
      </ul>
      <button
        className={styles.loadButton}
        type="button"
        onClick={() => setPageToGet(pageToGet + 1)}
      >
        Load More
      </button>
    </div>
  );
};

export default Users;

// 1. The logo looks tiny on smaller devices.
// 2. TEC theme is not displayed on the app bar instead a green color is seen.
// 3. Users screen does not display any data.
// 4. Load more button style is not working.
// 5. Style issues are encountered on the page - style however you want.
// 6. Additional data is not displayed upon using "Load more" button.
// 7. Users are not filtered by gender and the list does not reset on change select.
// 8. No loading state is displayed when accessing "Users" component.
// 9. On home page user should be able to do the following actions with cards that contain
// 2 fields: Title and Description
//     - See all the cards already added
//     - Add a card
//     - Update a card
//     - Delete a card
