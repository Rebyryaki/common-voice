export const up = async function (db: any): Promise<any> {
  return db.runSql(`
    ALTER TABLE sentences
    ADD COLUMN is_validated TINYINT DEFAULT FALSE NOT NULL;
    -- Update all existing sentences to be valid
    UPDATE sentences SET is_validated = TRUE;

    CREATE TABLE IF NOT EXISTS sentence_votes
    (
      id INT NOT NULL AUTO_INCREMENT,
      sentence_id VARCHAR(255) NOT NULL,
      client_id CHAR(36) DEFAULT NULL,
      vote TINYINT DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT NOW(),
      updated_at DATETIME NOT NULL DEFAULT NOW(),
      PRIMARY KEY (id),
      FOREIGN KEY (sentence_id) REFERENCES sentences(id) ON DELETE CASCADE,
      FOREIGN KEY (client_id) REFERENCES user_clients(client_id) ON DELETE CASCADE
    )
  `);
};

export const down = async function (db: any): Promise<any> {
  return db.runSql(`
    ALTER TABLE sentences DROP COLUMN  is_validated;

    DROP TABLE sentence_votes;
  `);
};
