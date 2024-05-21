ALTER TABLE "User"
ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE "User"
ADD CONSTRAINT unique_phone UNIQUE (phone);