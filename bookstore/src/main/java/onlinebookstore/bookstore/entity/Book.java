package onlinebookstore.bookstore.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tbl_book")
@Setter
@Getter
@ToString
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long id;

	public String sku;

	public String name;

	public String description;

	@Column(name = "unit_price")
	public BigDecimal unitPrice;

	@Column(name = "image_url")
	public String imageUrl;

	public boolean active;

	@Column(name = "units_in_stock")
	public int unitsInStock;

	@Column(name = "date_created")
	public Date createdOn;

	@Column(name = "last_updated")
	public Date updatedOn;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	public BookCategory category;
}
