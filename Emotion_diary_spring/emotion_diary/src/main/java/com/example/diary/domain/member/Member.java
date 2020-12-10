package com.example.diary.domain.member;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.example.diary.domain.board.Board;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int mno;
	
	@Column(length = 50)
	private String id;
	
	@Column(length = 50)
	private String pw;
	
	@Column(length = 40)
	private String name;

	
	@JsonIgnoreProperties({"member"})
	@OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
	private List<Board> board;
}
