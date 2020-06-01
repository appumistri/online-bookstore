package onlinebookstore.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import onlinebookstore.bookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
