package com.lucas.demo.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.lucas.demo.entities.Jogo;
import com.lucas.demo.services.JogoService;

@RestController
@RequestMapping("/Jogos")
public class JogoController {

	private final JogoService jogoService;

	@Autowired
	public JogoController(JogoService jogoService) {
		this.jogoService = jogoService;
	}

	@GetMapping("/home")
	public String paginaInicial() {
		return "index";
	}

	@GetMapping("/{id}")
	public ResponseEntity<Jogo> getJogo(@PathVariable Long id) {
		Jogo jogo = jogoService.getJogoById(id);

		if (jogo != null) {
			return ResponseEntity.ok(jogo);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	@GetMapping
	public List<Jogo> getAllJogos() {
		return jogoService.getAllJogos();
	}

	@DeleteMapping("/{id}")
	public void deleteJogo(@PathVariable Long id) {
		jogoService.deleteJogo(id);
	}

	@PostMapping("/create")
	public Jogo createJogo(@RequestParam("name") String name, 
			@RequestParam("platform") String platform,
			@RequestParam("price") double price, 
			@RequestParam("category") String category,
			@RequestParam("thumbnail") MultipartFile thumbnail) throws IOException {
		byte[] imagemBytes = thumbnail.getBytes();
		Jogo jogo = new Jogo();
		jogo.setName(name);
		jogo.setPlatform(platform);
		jogo.setCategory(category);
		jogo.setPrice(price);
		jogo.setThumbnail(imagemBytes);
		return jogoService.saveJogo(jogo);
	}
			
	@PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
	public Jogo updateJogo(@PathVariable Long id,
				@RequestPart("name") String name,
				@RequestPart("platform") String platform,
				@RequestPart("price") double price,
				@RequestPart("category") String category,
				@RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail) {
		Jogo jogoAtualizado = new Jogo();
		jogoAtualizado.setName(name);
		jogoAtualizado.setCategory(category);
		jogoAtualizado.setPlatform(platform);
		jogoAtualizado.setPrice(price);
		
		return jogoService.updateJogo(id, jogoAtualizado, thumbnail);
	}
	
}
