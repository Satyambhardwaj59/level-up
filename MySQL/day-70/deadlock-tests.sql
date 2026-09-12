USE ecommerce_transactions;

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id BIGINT PRIMARY KEY,

    balance DECIMAL(12,2) NOT NULL,

    CONSTRAINT chk_balance
        CHECK (balance >= 0)
) ENGINE = InnoDB;


INSERT INTO accounts (id, balance)
VALUES
(1, 10000.00),
(2, 10000.00);

SELECT *
FROM accounts;