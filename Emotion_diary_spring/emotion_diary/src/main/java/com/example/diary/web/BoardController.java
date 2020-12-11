package com.example.diary.web;

import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.python.core.PyFunction;
import org.python.core.PyInteger;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.diary.domain.board.Board;
import com.example.diary.domain.board.BoardRepository;
import com.example.diary.domain.member.Member;
import com.example.diary.domain.member.MemberRepository;
import com.example.diary.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BoardController {
	private final HttpSession session;
	private final BoardService boardService;
	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;

	// 글 등록
	@PostMapping("/board")
	public ResponseEntity<?> save(HttpServletRequest request,@RequestBody Board board) {
//		System.out.println("board save 호출");
//		System.out.println("세션?"+session.getId());
//		Member principal = (Member) session.getAttribute("principal");
		int id = (int) session.getAttribute("id");
		System.out.println("보드꺼."+id);
		if(session.getAttribute("id")!=null) {
			Member member = memberRepository.findByMno(id);
			boardService.글쓰기(board, member);
			return new ResponseEntity<String>("글등록 완료", HttpStatus.CREATED);	
		}else {
			return new ResponseEntity<String>("글등록 실패 ", HttpStatus.FORBIDDEN);
		}
		
		
	}

	// 글 상세
	@GetMapping("/board/{id}")
	public ResponseEntity<?> detail(@PathVariable int id) {
		return new ResponseEntity<Board>(boardService.글상세(id), HttpStatus.OK);
	}
	
	@GetMapping("/board/one/{id}")
	public Board oneDetail(@PathVariable int id) {
		return boardRepository.findById(id).get();
	}

	private static PythonInterpreter intPre;

	// 글 목록(임시)
	@GetMapping("/test")
	public void getTest() {
		intPre = new PythonInterpreter();
		intPre.execfile("src\\main\\java\\com\\example\\diary\\web\\test.py");
		intPre.exec("print(testFunc(5,10))");

		PyFunction pyFuntion = (PyFunction) intPre.get("testFunc", PyFunction.class);
		int a = 10, b = 20;
		PyObject pyobj = pyFuntion.__call__(new PyInteger(a), new PyInteger(b));
		System.out.println(pyobj.toString());

	}
	
	
	@GetMapping("/board/{userId}")
	public ResponseEntity<?> myBoardList(@PathVariable String userId) {
		return new ResponseEntity<List<Board>>(boardService.내글목록(userId), HttpStatus.OK);
	}

	// 글 수정
	@PutMapping("/board/{id}")
	public ResponseEntity<?> update(@RequestBody Board board, @PathVariable int id) {
		int sid = (int) session.getAttribute("id");
		System.out.println("멤버 id."+sid);
		Member principal = memberRepository.findByMno(sid);
		int result = boardService.글수정(board, id, principal);
		if (result == 1) {
			return new ResponseEntity<String>("ok", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.FORBIDDEN);
		}
	}

	// 글 삭제
	@DeleteMapping("/board/{id}")
	public ResponseEntity<?> delete(@PathVariable int id) {
		System.out.println("삭제호출");
		int sid = (int) session.getAttribute("id");
		System.out.println("멤버 id."+sid);
		Member principal = memberRepository.findByMno(sid);
		
		int result = boardService.글삭제(id, principal);
		if (result == 1) {
			return new ResponseEntity<String>("ok", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.FORBIDDEN);
		}
	}
}
