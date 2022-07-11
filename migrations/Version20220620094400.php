<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220620094400 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user_possession');
        $this->addSql('ALTER TABLE possession ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE possession ADD CONSTRAINT FK_F9EE3F42A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_F9EE3F42A76ED395 ON possession (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_possession (user_id INT NOT NULL, possession_id INT NOT NULL, INDEX IDX_5E89F9AEA337924 (possession_id), INDEX IDX_5E89F9AEA76ED395 (user_id), PRIMARY KEY(user_id, possession_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE user_possession ADD CONSTRAINT FK_5E89F9AEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_possession ADD CONSTRAINT FK_5E89F9AEA337924 FOREIGN KEY (possession_id) REFERENCES possession (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE possession DROP FOREIGN KEY FK_F9EE3F42A76ED395');
        $this->addSql('DROP INDEX IDX_F9EE3F42A76ED395 ON possession');
        $this->addSql('ALTER TABLE possession DROP user_id');
    }
}
