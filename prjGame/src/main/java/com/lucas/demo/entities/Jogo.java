package com.lucas.demo.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="tbjogo")
public class Jogo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String platform;
	
	@Lob
	private byte[] thumbnail;
		
	private double price;
	
	private String category;
	
	public Jogo(Long id, String name, String platform, byte[] thumbnail, double price, String category) {
		super();
		this.id = id;
		this.name = name;
		this.platform = platform;
		this.thumbnail = thumbnail;
		this.price = price;
		this.category = category;
	}

	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getPlatform() {
		return platform;
	}



	public void setPlatform(String platform) {
		this.platform = platform;
	}



	public byte[] getThumbnail() {
		return thumbnail;
	}



	public void setThumbnail(byte[] thumbnail) {
		this.thumbnail = thumbnail;
	}



	public double getPrice() {
		return price;
	}



	public void setPrice(double price) {
		this.price = price;
	}



	public String getCategory() {
		return category;
	}



	public void setCategory(String category) {
		this.category = category;
	}



	public Jogo() {
		
	}
}
